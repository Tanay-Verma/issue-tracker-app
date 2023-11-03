import Pagination from '@/components/Pagination'
import { Button } from '@radix-ui/themes'

export default function Home({searchParams}:{searchParams:{page:string}}) {
  return (
   <Pagination currentPage={parseInt(searchParams.page)} itemCount={10} pageSize={1}/>
  )
}
