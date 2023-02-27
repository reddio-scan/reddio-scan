import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

import { ReactNode } from 'react';
import { ButtonStyling } from '../CustomStyled';

interface CustomModalProps {
  modalTitle: string;
  modalHeader: string;
  children: ReactNode;
}

const CustomModal = ({
  modalTitle,
  modalHeader,
  children,
}: CustomModalProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ButtonStyling>
        <Button
          style={{
            borderRadius: '16px',
            borderBlockColor: 'grey',
            borderColor: 'white',
            width: '80',
          }}
          height="44px"
          width="160px"
          border="2px"
          borderColor="white"
          bgColor="grey-light"
          onClick={onOpen}
        >
          {modalTitle}
        </Button>
      </ButtonStyling>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height="240">
          <ModalHeader>{modalHeader}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
