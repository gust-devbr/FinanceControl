import type { NextRequest } from "next/server";
import { UserController } from "@/modules/user/controller/user-controller";

export async function GET() {
    return await new UserController().getHandler()
}

export async function PUT(req: NextRequest) {
    return await new UserController().putHandler(req)
}

export async function DELETE(req: NextRequest) {
    return await new UserController().deleteHandler(req)
}