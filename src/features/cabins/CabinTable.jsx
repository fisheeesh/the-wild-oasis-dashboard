import Spinner from "../../ui/Spinner";
import CabinRow from './CabinRow'
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import usePageTitle from "../../hooks/usePageTitle";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

export default function CabinTable() {
  const [searchParams] = useSearchParams()
  const { cabins, isPending } = useCabins()

  usePageTitle(`Cabins`)

  //? For Filter
  const filterValue = searchParams.get('discount') || 'all'

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins
  if (filterValue === 'no-discount') filteredCabins = cabins?.filter(cabin => cabin.discount === 0)
  if (filterValue === 'with-discount') filteredCabins = cabins?.filter(cabin => cabin.discount > 0)

  //? For Sort
  const sortBy = searchParams.get('sortBy') || 'startDate-asc'
  const [field, direction] = sortBy.split('-')
  const modifier = direction === 'asc' ? 1 : -1
  const sortedCabins = filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier)

  //? Pagination
  const currentPage = !searchParams.get('page') ? 1 : Number(searchParams.get('page'))
  const from = (currentPage - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE - 1
  const paginatedCabins = sortedCabins?.slice(from, to)

  if (isPending) return <Spinner />

  if (!cabins.length) return <Empty resourceName={'cabins'} />

  return (
    <Menus>
      <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
        <Table.Header role='row'>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={paginatedCabins}
          render={cabin => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />

        <Table.Footer>
          <Pagination count={sortedCabins.length} />
        </Table.Footer>
      </Table>
    </Menus>
  )
}

