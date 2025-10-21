import React from 'react';
import { Modal, ModalOverlay, ModalContent,useColorModeValue, ModalHeader, ModalCloseButton, ModalBody, Text, Button } from '@chakra-ui/react';

const TextModal = ({ isOpen, onClose, text }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Full Text</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text color={textColor} fontSize="md">{text}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TextModal;
