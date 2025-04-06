import { Group, Text, Button, Container, Fieldset, Select, Stack, TagsInput, Textarea, Title, Card, Avatar, Grid, Space, MultiSelect } from "@mantine/core";
import { IconSend, IconFileText } from "@tabler/icons-react";

function FieldLabel({ children }) {
  return (
    <Text size="sm" fw="500">
      {children}
    </Text>
  )
}

function FieldStack({ children}) {
  return (
    <Stack gap="0.5rem">
      {children}
    </Stack>
  )
}

export default function SubmitReport() {

  return (
    <Container size="sm" py="2rem">
      <Stack gap="lg">
        <Group gap="xs">
          <IconFileText size="1.4rem" />
          <Text size="1.2rem" fw="bolder">
            File a report
          </Text>
        </Group>
        <Card shadow="xs" padding="lg" radius="md">
          <Card.Section withBorder p="md">
            <Stack>
              <Grid gutter="xs">
                <Grid.Col span="content">
                  <Avatar radius="100%" size="md" variant="filled" />
                </Grid.Col>
                <Grid.Col span="auto">
                  <FieldStack>
                    <FieldLabel>
                      What's happening?
                    </FieldLabel>
                    <Textarea 
                      placeholder="Write a detailed report regarding the incident" 
                      variant="unstyled"
                      autosize
                      minRows={14}
                      maxRows={14}
                      radius="md"
                      styles={{
                        input: {
                          backgroundColor: "rgba(0, 0, 0, 0.025)",
                          padding: "0.8rem",
                        }
                      }}
                      >
                    </Textarea> 
                  </FieldStack>
                </Grid.Col>
              </Grid> 
              <FieldStack>
                <FieldLabel>
                  Nature of the report
                </FieldLabel>
                <TagsInput 
                  variant="unstyled" 
                  styles={{
                    input: {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      padding: "0.6rem",
                    }, 
                    inputField: {
                      color: "rgba(0, 0, 255, 1)",
                    }
                  }}
                  limit={5}
                  acceptValueOnBlur={false}
                  clearable
                  placeholder="Select or specify the nature of the report"
                  data={[
                    { value: 'Fake News', label: 'Fake News' },
                    { value: 'Vote-buying', label: 'Vote-buying' },
                  ]}
                  />
              </FieldStack>
              <FieldStack>
                <FieldLabel>
                  Subjects involved
                </FieldLabel>
                <TagsInput 
                  variant="unstyled" 
                  styles={{
                    input: {
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      padding: "0.6rem",
                    }
                  }}
                  limit={5}
                  acceptValueOnBlur={false}
                  clearable
                  placeholder="Select or specify the subjects involved"              
                  />
              </FieldStack>
              <FieldStack>
                <FieldLabel>Location of the incident</FieldLabel>
                <Stack gap="sm">
                  <Select 
                    placeholder="Select Province" 
                    variant="unstyled" 
                    styles={{
                      input: {
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                        padding: "1.4rem 0.6rem",
                      }
                    }}
                    data={['Antique', 'Iloilo', 'Capiz', 'Aklan']}/>
                  <Select 
                    placeholder="City" 
                    variant="unstyled" 
                    styles={{
                      input: {
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                        padding: "1.4rem 0.6rem",
                      }
                    }}              
                    />
                  <Select 
                    variant="unstyled" 
                    styles={{
                      input: {
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                        padding: "1.4rem 0.6rem",
                      }, 
                    }}              
                    placeholder="Barangay" 
                    />
                </Stack>                
              </FieldStack>
            </Stack>
          </Card.Section>
          <Card.Section withBorder p="md">
            <Group justify="flex-end">
              <Button 
                radius="lg" 
                variant="primary"
                leftSection={<IconSend size="1rem" />}
                >Submit</Button>
            </Group>
          </Card.Section>
        </Card>
      </Stack>
    </Container>
  ); 

}