
import { Col, Container, Row } from 'react-bootstrap';
import ContactCardAdmin from '@/components/ContactCardAdmin';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { auth } from '@/lib/auth';

const AdminPage = async () => {
  const session = await auth();

  adminProtectedPage(
    session as {
      user: { email: string; id: string; name: string };
    } | null,
  );

  const contacts = await prisma.contact.findMany({
    include: {
      notes: true,
    },
  });

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Contacts (Admin)</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {contacts.map((item) => (
                <Col key={`Contact-${item.firstName}`}>
                  <ContactCardAdmin contact={item} notes={item.notes} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
