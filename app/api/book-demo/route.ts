import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.NOTION_DATABASE_ID ?? "";

type BookingPayload = {
  name?: string;
  email?: string;
  phone?: string;
  firmName?: string;
  date?: string;
  timeSlot?: string;
  software?: string;
};

function asText(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function safeIsoDate(v: unknown) {
  const s = asText(v);
  if (!s) return "";
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, firmName, date, timeSlot, software } =
      body as BookingPayload;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    if (!DATABASE_ID) {
      return NextResponse.json(
        { error: "Notion database not configured." },
        { status: 500 }
      );
    }

    const db: any = await notion.databases.retrieve({ database_id: DATABASE_ID });
    const dbProps: Record<string, any> = db?.properties ?? {};
    const titleKey =
      Object.entries(dbProps).find(([, v]) => (v as any)?.type === "title")?.[0] ??
      "Name";

    const bookingAtIso = new Date().toISOString();
    const allFields: Record<string, string> = {
      Name: asText(name),
      Email: asText(email),
      Phone: asText(phone),
      "Firm / Company": asText(firmName),
      "Preferred Date": asText(date),
      "Time Slot": asText(timeSlot),
      Software: asText(software),
      "Booked At": bookingAtIso,
    };

    const properties: Record<string, any> = {
      [titleKey]: { title: [{ text: { content: asText(name) } }] },
    };

    const setIfExists = (
      key: string,
      build: (prop: any) => unknown | null
    ) => {
      const prop = (dbProps as any)[key];
      if (!prop) return;
      const val = build(prop);
      if (val) properties[key] = val;
    };

    setIfExists("Email", (prop) =>
      prop.type === "email" ? { email: asText(email) } : null
    );
    setIfExists("Phone", (prop) =>
      prop.type === "phone_number" ? { phone_number: asText(phone) } : null
    );

    setIfExists("Firm / Company", (prop) =>
      prop.type === "rich_text"
        ? { rich_text: [{ text: { content: asText(firmName) } }] }
        : null
    );

    setIfExists("Preferred Date", (prop) => {
      const iso = safeIsoDate(date);
      if (!iso) return null;
      if (prop.type === "date") return { date: { start: iso } };
      if (prop.type === "rich_text")
        return { rich_text: [{ text: { content: asText(date) } }] };
      return null;
    });

    setIfExists("Time Slot", (prop) =>
      prop.type === "rich_text"
        ? { rich_text: [{ text: { content: asText(timeSlot) } }] }
        : null
    );

    setIfExists("Software", (prop) => {
      if (prop.type !== "select") return null;
      const desired = asText(software);
      const options = prop.select?.options ?? [];
      const match =
        desired && options.some((o: any) => o?.name === desired)
          ? desired
          : options[0]?.name ?? "";
      return match ? { select: { name: match } } : null;
    });

    setIfExists("Status", (prop) => {
      if (prop.type !== "select") return null;
      const options = prop.select?.options ?? [];
      const match = options.some((o: any) => o?.name === "New")
        ? "New"
        : options[0]?.name ?? "";
      return match ? { select: { name: match } } : null;
    });

    setIfExists("Booked At", (prop) =>
      prop.type === "date" ? { date: { start: bookingAtIso } } : null
    );

    const children = Object.entries(allFields)
      .filter(([, v]) => v)
      .map(([k, v]) => ({
        object: "block" as const,
        type: "bulleted_list_item" as const,
        bulleted_list_item: {
          rich_text: [
            { type: "text" as const, text: { content: `${k}: ${v}` } },
          ],
        },
      }));

    await notion.pages.create({
      parent: { database_id: DATABASE_ID },
      properties: properties as any,
      ...(children.length ? ({ children } as any) : {}),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[book-demo]", err);
    return NextResponse.json(
      { error: "Failed to save booking. Please try again." },
      { status: 500 }
    );
  }
}
