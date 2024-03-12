"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import axios from "axios";

interface ModalEditorProps {
  isOpen: boolean;
  note: any;
  onClose: () => void;
  setNote: React.Dispatch<React.SetStateAction<object[]>>;
  setNotes: React.Dispatch<React.SetStateAction<object[]>>;
}

const ModalEditor: React.FC<ModalEditorProps> = ({
  isOpen,
  note,
  onClose,
  setNote,
  setNotes,
}) => {
  const editNote = () => {
    axios.patch(`/notes/${note.id}`, note).then((res) => {
      setNotes((p) => [...p, res.data]);
      onClose();
    });
  };

  const setting = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setNote((p) => ({ ...p, [key]: e.target.value }));
  };

  return (
    <Modal size={"sm"} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Edit Note</ModalHeader>
        <ModalBody>
          <Input
            placeholder="Title"
            value={note.title}
            onChange={(e) => setting("title", e)}
          />
          <Textarea
            placeholder="Note"
            value={note.note}
            onChange={(e) => setting("note", e)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" variant="ghost" onPress={onClose}>
            Close
          </Button>
          <Button color="secondary" onPress={editNote}>
            Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditor;
