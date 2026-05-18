import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, attending, allergies, bus, routeId } = body;

    // Validate name presence
    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "Por favor, introduce tu nombre completo." },
        { status: 400 }
      );
    }

    // Simulate database write & email dispatcher network latency
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: attending === "yes"
        ? `¡Qué ilusión, ${name}! Nos vemos en el gran día.`
        : `Lamentamos que no puedas venir, ${name}. ¡Te echaremos de menos!`,
      data: {
        name,
        attending: attending === "yes",
        allergies: allergies || "Ninguna",
        bus: bus === "yes",
        routeId: bus === "yes" ? routeId : null,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Ha ocurrido un error al procesar tu solicitud." },
      { status: 500 }
    );
  }
}
