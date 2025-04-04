import TableOperation from '../../ui/TableOperations'
import Filter from '../../ui/Filter'

export default function CabinTableOperation() {
    return (
        <TableOperation>
            <Filter 
            filterField='discount'
            options={[
                {value: 'all', label: 'All'},
                {value: 'no-discount', label: 'No Discount'},
                {value: 'with-discount', label: 'With Discount'},
            ]}

            />
        </TableOperation>
    )
}
