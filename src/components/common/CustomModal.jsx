import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React from 'react';

const CustomModal = ({ title, isOpen, onOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={'650px'}>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
