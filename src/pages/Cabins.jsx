import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperation from "../features/cabins/CabinTableOperation";

function Cabins() {
  return (
    <>
      <Row type="horizontal" responsive>
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperation />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
