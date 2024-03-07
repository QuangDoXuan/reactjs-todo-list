import { Modal } from "antd"
interface ModalConfirmDeleteProps {
  open: boolean;
  onConfirmDelete: () => void;
  onCancel: () => void;
}

export const ModalConfirmDelete = ({ open, onCancel, onConfirmDelete }: ModalConfirmDeleteProps) => {
  return (
    <Modal
      title={'Confirm Delete'}
      open={open}
      onOk={onConfirmDelete}
      okText={'Confirm'}
      onCancel={onCancel}
    >
      <div className="confirm-delete">
        <p>Delete this ticket?</p>
      </div>
    </Modal>
  )
}