"use client";

import { Card, Image, ListGroup } from 'react-bootstrap';
import { Contact } from '@/lib/validationSchemas';
import { Note } from '@prisma/client';
import NoteItem from '@/components/NoteItem';
import AddNoteForm from '@/components/AddNoteForm';

const ContactCard = ({ contact, notes }: { contact: Contact; notes: Note[] }) => {
  return (
    <Card className="h-100">
      <Card.Header>
        <Image
          src={contact.image}
          width={75}
          alt={`${contact.firstName} ${contact.lastName}`}
        />
      </Card.Header>
      <Card.Body>
        <Card.Title>{contact.firstName} {contact.lastName}</Card.Title>
        <Card.Subtitle>{contact.address}</Card.Subtitle>
        <Card.Text>{contact.description}</Card.Text>
        <p className="blockquote-footer">Owner: {contact.owner}</p>

        <ListGroup variant="flush">
            {notes.map((note: Note) => (
                <NoteItem key={note.id} note={note} />
            ))}
        </ListGroup>
        <AddNoteForm contactId={contact.id} />
      </Card.Body>
    </Card>
  );
};

export default ContactCard;
