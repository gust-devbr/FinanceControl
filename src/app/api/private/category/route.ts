import { type NextRequest } from "next/server";
import { CategoryController } from "@/modules/category/controller/category-controller";

export async function GET(req: NextRequest) {
    return await new CategoryController().getHandler(req)
}

export async function POST(req: NextRequest) {
    return await new CategoryController().postHandler(req)
}