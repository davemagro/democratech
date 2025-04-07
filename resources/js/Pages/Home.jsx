import { 
  Container, Title, Stack, Card, Text, Button, Group, Avatar, 
  Paper, SimpleGrid, Image, Grid, List, ThemeIcon, Collapse, 
  Space, Checkbox, TextInput, 
  Divider
} from "@mantine/core"
import { useForm, usePage } from "@inertiajs/react"
import moment from "moment"
import { formatFileSize } from "../util"
import { IconDownload, IconPhoto, IconUserCircle, IconThumbUp, IconBubble, IconThumbDown } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { notifications } from "@mantine/notifications"

export function ReportView({report}) {

  /*
    Survey methods:
      1. Questions answerable by a number 1-5. 
      2. Twitter - style: Final verdict (yes/hmmmm/no) + a selection of reasons 
          as to why they chose that verdict. 

          - much less cognitive load as it doesn't feel like the user is required to 
            answer survey questions first. 
  */ 

  const surveyQuestions = {
    "yes": [
      {
        "id": 1,
        "question": "Easy to understand",
      }, 
      {
        "id": 2,
        "question": "It includes credible sources or evidence",
      }, 
      {
        "id": 3,
        "question": "Directly addresses the issue",
      },
      {
        "id": 4,
        "question": "Uses neutral and unbiased language",
      }, 
      {
        "question": "Provides important context",
      }
    ], 
    "no": [
      {
        "id": 5,
        "question": "The report is misleading, false or fake", 
      }, 
      {
        "id": 6,
        "question": "Lacks credible evidence or sources",
      }, 
      {
        "id": 7,
        "question": "Opinion or speculation, not based on facts",
      }, 
      {
        "id": 8,
        "question": "Spam or low-effort"
      }, 
      {
        "id": 9,
        "question": "Poorly written, difficult to understand",
      }
    ]
  }

  const { data, setData, post, processing, reset } = useForm({
    rating: '', 
    reasoning: [], 
    reasoning_other: '', 
  }); 
  
  const handleSubmit = () => {
    post(route('review.save', report.id), {
      onSuccess: () => {
        reset(); 
        setRating(null); 
        notifications.show({
          title: "Thank you for your feedback!", 
          message: "Your review has been recorded.", 
          color: "green", 
        }); 
      }
    }); 
  }

  const toggleQuestionIdFromData = (id, remove = false) => {
    if (remove) {
      setData('reasoning', data.reasoning.filter((e) => e !== id)); 
    } else {
      setData('reasoning', Array.from(new Set([...data.reasoning, id]))); 
    }
  }

  const [opened, { open, close }] = useDisclosure(false);
  const [rating, setRating] = useState(null);
  

  useEffect(() => {
    if (rating) open(); 
    else close(); 
    setData('rating', rating); 
  }, [rating]); 
  
  return (
    <Card key={report.id} shadow="xs" withBorder>
    <Card.Section p="sm" withBorder>
      <Stack gap="lg">
        <Grid>
          <Grid.Col span="content">
            {/* <Avatar/> */}
            <ThemeIcon variant="light" color="gray" size="xl" radius="xl">
              <IconUserCircle />
            </ThemeIcon>
          </Grid.Col>
          <Grid.Col span="auto">
            <Stack gap="0.3rem">
              <Text size="sm" c="dimmed">{ moment(report.created_at).fromNow()}</Text>
              <Paper p="xs" withBorder c="dark.5" radius="md" style={{borderTopLeftRadius: 0}}>
                <Text size="sm" style={{whiteSpace: "pre-wrap"}}>{report.body}</Text>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
        {report.images.length > 0 && (
          <Grid>
            <Grid.Col span="content">
              <ThemeIcon variant="light" color="gray" size="xl" radius="xl">
                <IconPhoto />
              </ThemeIcon>
            </Grid.Col>
            <Grid.Col span="auto">
              <Stack gap="0.3rem">
                <Text size="sm" c="dimmed">
                  Added images 
                </Text>
                <SimpleGrid cols={4}>
                  {report.images.map((image) => (
                    <Image 
                      src={image.path}
                      fit="contain"
                      h={150}
                      w={100}
                      mx="auto"
                      />
                  ))}
                </SimpleGrid>                       
              </Stack>
            </Grid.Col>
          </Grid>
        )}
        {report.files.length > 0 && (
          <Grid>
            <Grid.Col span="content">
              <ThemeIcon variant="light" color="gray" size="xl" radius="xl">
                <IconDownload />
              </ThemeIcon>
            </Grid.Col>
            <Grid.Col span="auto">
              <Stack gap="0.3rem">
                <Text size="sm" c="dimmed">Attached files </Text>
                <Stack gap="0.3rem">
                  {report.files.map((file) => (
                    <Group>
                      <Text size="sm">
                        <a href={file.path} target="_blank" rel="noopener noreferrer">
                          {file.file_name}
                        </a>
                      </Text>
                      <Text size="xs" c="dimmed">
                        {formatFileSize(file.file_size)}
                      </Text>
                    </Group>
                  ))}
                </Stack>                  
              </Stack>
            </Grid.Col>
          </Grid> 
        )}
      </Stack>
    </Card.Section>
    <Card.Section p="sm" withBorder bg="rgb(249 250 251)">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">Should more people see this?</Text>
        {/* <Button variant="default" onClick={toggle}>{opened ? "Cancel" : "Rate"}</Button> */}
        <Group justify="center" gap="xs">
          <Button variant={rating === "yes" ? "light" : "default"} leftSection={<IconThumbUp />} onClick={() => setRating("yes")}>Yes</Button>
          <Button variant={rating === "hmmmm" ? "light" : "default"} leftSection={<IconBubble />} onClick={() => setRating("hmmmm")}>Hmmmm</Button>
          <Button variant={rating === "no" ? "light" : "default"} leftSection={<IconThumbDown />} onClick={() => setRating("no")}>No</Button>
        </Group>        
      </Group>
      <Collapse in={opened}>
        <Stack pt="lg">
          {
            (rating === "yes" || rating === "hmmmm") && surveyQuestions['yes'].map((e) => (
              <Checkbox label={e.question} onChange={(evt) => toggleQuestionIdFromData(e.id, !evt.target.checked)} />
            ))
          }
          { rating === "hmmmm" && <Divider /> }
          {
            (rating === "no" || rating === "hmmmm") && surveyQuestions['no'].map((e) => (
              <Checkbox label={e.question} onChange={(evt) => toggleQuestionIdFromData(e.id, !evt.target.checked)} />
            ))
          }
          <Group pl="xl">
            <Text size="sm">Other:</Text>
            <TextInput placeholder="" value={data.reasoning_other} onChange={(e) => setData('reasoning_other', e.target.value)} />
          </Group>
          <Group justify="center">
            <Button radius="xl" variant="filled" disabled={processing} onClick={handleSubmit}>Submit</Button>
          </Group>
        </Stack>
      </Collapse>
    </Card.Section>
  </Card>    
  ); 
}

export default function Home() {
  const { reports } = usePage().props; 
  return (
    <Container size="sm" mx="auto" my="lg">
      <Stack>
        {reports.map((report) => (
          <ReportView key={report.id} report={report} />
        ))}
      </Stack>
    </Container>
  ); 
}