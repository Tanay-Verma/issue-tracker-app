import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    const allIssues = await prisma.issue.findMany({
      distinct:"assignedToUserId",
      where:{NOT:{assignedToUserId:null}},
      select:{assignedToUser:true}
    })
    
    return NextResponse.json(allIssues);
  };