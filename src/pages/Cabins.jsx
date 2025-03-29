import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import { useState } from "react";
import CreateEditCabinForm from "../features/cabins/CreateEditCabinForm";

function Cabins() {
  const [isShowForm, setIsShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <Button onClick={() => setIsShowForm(prev => !prev)}>Create a new Cabin</Button>
        {
          isShowForm && <CreateEditCabinForm />
        }
      </Row>
    </>
  );
}

export default Cabins;
