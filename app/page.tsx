import Pagination from '@/components/Pagination'
import { Button } from '@radix-ui/themes'
import LatestIssues from './LatestIssues'
import IssueRename from './IssueRename'
import prisma from '@/prisma/client'

export default async function Home() {
  const open = await prisma.issue.count({where:{status:"OPEN"}});
  const closed = await prisma.issue.count({where:{status:"CLOSED"}});
  const inProgress = await prisma.issue.count({where:{status:"IN_PROGRESS"}});

  return (
  //  <LatestIssues/>
  <IssueRename closed={closed} inProgress={inProgress} open={open}/>
  )
}
