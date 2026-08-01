import type { NextRequest } from "next/server";
import type { ParamsType } from "@/@types/api/params";

import { FinanceController } from "@/modules/finance/controller/finance-controller";

export async function PUT(req: NextRequest, { params }: ParamsType) {
    return await new FinanceController().putHandler(req, await params)
}

export async function DELETE(req: NextRequest, { params }: ParamsType) {
    return await new FinanceController().deleteHandler(req, await params)
}
