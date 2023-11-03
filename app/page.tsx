import Pagination from '@/components/Pagination'
import { Button } from '@radix-ui/themes'

export default function Home() {
  return (
   <Pagination currentPage={4} itemCount={10} pageSize={3}/>
  )
}
