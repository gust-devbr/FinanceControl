import { type NextRequest } from "next/server";

import { FinanceController } from "@/modules/finance/controller/finance-controller";

export async function GET(req: NextRequest) {
    return await new FinanceController().getHandler(req)
}

export async function POST(req: NextRequest) {
    return await new FinanceController().postHandler(req)
}
