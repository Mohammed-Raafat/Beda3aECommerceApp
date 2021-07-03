import React from 'react';
import { Image, Modal } from 'semantic-ui-react';

const ImageModal = (props) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='tiny'
      trigger={<div style={{cursor: 'zoom-in'}}>{props.children}</div>}
    >
      <Modal.Header>{props.title}</Modal.Header>
      <Modal.Content>
        <Image src={props.imgSrc} size='medium' centered/>
      </Modal.Content>
    </Modal>
  )
}

export default ImageModal;