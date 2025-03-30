import { useState } from "react";
import Button from "../../ui/Button";
import CreateEditCabinForm from "./CreateEditCabinForm";
import Modal from "../../ui/Modal";

export default function AddCabin() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    return (
        <div>
            <Button onClick={() => setIsOpenModal(prev => !prev)}>Create a new Cabin</Button>
            {
                isOpenModal && <Modal onClose={() => setIsOpenModal(false)}>
                    <CreateEditCabinForm onCloseModal={() => setIsOpenModal(false)} />
                </Modal>
            }
        </div>
    )
}
