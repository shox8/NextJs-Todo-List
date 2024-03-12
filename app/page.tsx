"use client";
import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import ModalCreator from "./components/ModalCreator";
import axios from "axios";
import ModalEditor from "./components/ModalEditor";

export default function Home() {
  const [isCreatorOpen, setCreatorOpen] = useState<boolean>(false);
  const [isEditorOpen, setEditorOpen] = useState<boolean>(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [note, setNote] = useState<object>({});

  useEffect(() => {
    axios.get("/notes").then((res) => {
      setNotes(res.data);
    });
  });

  const toggleCreatorModal = () => setCreatorOpen(!isCreatorOpen);

  const toggleEditorModal = () => setEditorOpen(!isEditorOpen);

  const startEdit = (item: object) => {
    toggleEditorModal();
    setNote(item);
  };

  const remove = (id: string) => {
    axios.delete(`/notes/${id}`).then((res) => {
      notes.map((item, index) => {
        if (item.id === res.data) {
          setNotes((p) => p.splice(index, 1));
        }
      });
    });
  };

  return (
    <main>
      <ModalCreator
        isOpen={isCreatorOpen}
        onClose={toggleCreatorModal}
        setNotes={setNotes}
      />
      <ModalEditor
        isOpen={isEditorOpen}
        note={note}
        onClose={toggleEditorModal}
        setNote={setNote}
        setNotes={setNotes}
      />
      <div className="flex justify-between items-center p-4 h-20 w-full">
        <h1 className="text-xl">Notes</h1>
        <Button color="secondary" onClick={toggleCreatorModal}>
          + Add New Note
        </Button>
      </div>
      <div className="inline-grid grid-cols-4 gap-4 p-4">
        {notes.map((item, index) => (
          <Card key={index}>
            <CardHeader className="text-xl font-black flex justify-between">
              {item.title}
              <Dropdown>
                <DropdownTrigger>
                  <Button color="secondary" variant="flat">
                    Settings
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dropdown Variants">
                  <DropdownItem key="edit" onClick={() => startEdit(item)}>
                    Edit
                  </DropdownItem>
                  <DropdownItem
                    key="delete"
                    className="text-danger"
                    color="danger"
                    onClick={() => remove(item.id)}
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardHeader>
            <CardBody>
              <p className="text-default-500">{item.note}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
}
