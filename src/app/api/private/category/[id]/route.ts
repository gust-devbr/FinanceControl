import type { NextRequest } from "next/server"
import type { ParamsType } from "@/@types/api/params"

import { CategoryController } from "@/modules/category/controller/category-controller"

export async function DELETE(req: NextRequest, { params }: ParamsType) {
    return await new CategoryController().deleteHandler(req, await params)
}

export async function PUT(req: NextRequest, { params }: ParamsType) {
    return await new CategoryController().putHandler(req, await params)
}
