import { Box, Image, Group, Text, Button, Container, Fieldset, Select, Stack, TagsInput, Textarea, Title, Card, Avatar, Grid, Space, MultiSelect, ActionIcon, Stepper, FileButton, SimpleGrid, ThemeIcon, Pill, Collapse, Accordion, rgba } from "@mantine/core";
import { IconArrowRight, IconSend, IconFileText, IconPaperclip, IconPhoto, IconInfoCircle, IconTags, IconUsers, IconMapPin, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDisclosure, useHover } from "@mantine/hooks";
import { notifications } from '@mantine/notifications'; 
import { useForm } from "@inertiajs/react";
import { formatFileSize } from "../util";
import Layout from "../Layouts/Layout";
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


function ReportNatureForm({ initialValues, onChange }) {

  const [categories, setCategories] = useState(initialValues.categories || []);

  useEffect(() => {
    onChange(categories); 
  }, [JSON.stringify(categories)]); 

  return (
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
        placeholder="Select the categories which best fits your report"
        data={[
          { value: 'Fake News', label: 'Fake News' },
          { value: 'Vote-buying', label: 'Vote-buying' },
        ]}
        value={categories}
        onChange={(value) => {
          setCategories(value);
        }}
        />
      <Text size="xs" c="dimmed">
        If none of the existing categories match your report, you can create a new one by typing it into the input field and pressing Enter.
      </Text>
    </FieldStack>
  ); 
}

function ReportSubjectForm({ initialValues, onChange }) {
  const [subjects, setSubjects] = useState(initialValues.subjects); 
  useEffect(() => {
    onChange(subjects); 
  }, [JSON.stringify(subjects)]); 

  return (

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
        placeholder="Select or specify the individuals, groups, or organizations involved"
        value={subjects}
        onChange={setSubjects}              
        />
    </FieldStack>
  
  ); 
}

function ReportLocationForm({ locations, initialValues, onLocationChange }) {

  const [provinces, setProvinces] = useState({});

  const [provincesData, setProvincesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [barangaysData, setBarangaysData] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState(initialValues.province);
  const [selectedCity, setSelectedCity] = useState(initialValues.municipality);
  const [selectedBarangay, setSelectedBarangay] = useState(initialValues.barangay);  

  const updateSelectedProvince = (province) => {
    setSelectedProvince(province);
    setSelectedCity("");
    setCitiesData(Object.keys(provinces[province]).sort());
    setSelectedBarangay("");
    setBarangaysData([]);
  } 

  const updateSelectedCity = (city) => {
    setSelectedCity(city);
    setSelectedBarangay("");
    setBarangaysData(provinces[selectedProvince][city]);
  }

  const updateSelectedBarangay = (barangay) => {
    setSelectedBarangay(barangay);
  }

  useEffect(() => {
    onLocationChange({province: selectedProvince, municipality: selectedCity, barangay: selectedBarangay}); 
  }, [selectedProvince, selectedCity, selectedBarangay]); 

  useEffect(() => {
    let provinces = {}; 

    Object.values(locations).forEach((regionObj) => {  
      Object.entries(regionObj.province_list).forEach(([province, provinceObj]) => {
        Object.entries(provinceObj.municipality_list).forEach(([city, cityObj]) => {
          if (!provinces[province]) {
            provinces[province] = {}
          }
          provinces[province][city] = cityObj.barangay_list;
        });
      });
    }); 
    
    setProvinces(provinces);
    setProvincesData(Object.keys(provinces).sort());
  }, []);  

  return (
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
        data={provincesData.map((p) => ({ value: p, label: p }))}
        value={selectedProvince || null}
        onChange={updateSelectedProvince}
        />
      <Select 
        placeholder="Municipality" 
        variant="unstyled" 
        styles={{
          input: {
            backgroundColor: "rgba(0, 0, 0, 0.02)",
            padding: "1.4rem 0.6rem",
          }
        }}
        data={citiesData.map((c) => ({ value: c, label: c }))}
        value={selectedCity || null}
        onChange={updateSelectedCity}
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
        data={barangaysData.map((b) => ({ value: b, label: b }))}
        value={selectedBarangay || null}
        onChange={updateSelectedBarangay}
        />
    </Stack>            
  </FieldStack> 
  ); 
}

function ImagePreview({file, onRemove}) {
  const imageUrl = URL.createObjectURL(file);
  return (
    <Card>
      <Card.Section withBorder>
        <Image
          mx="auto" 
          h={150}
          w="auto"
          fit="contain"
          src={imageUrl} 
          onLoad={() => URL.revokeObjectURL(imageUrl)} 
          radius="md" 
          withPlaceholder
          styles={{ placeholder: { backgroundColor: "rgba(0, 0, 0, 0.1)" } }}
          >
        </Image>
      </Card.Section>
      <Card.Section withBorder p="xs">
        <Group position="apart">
          <Text size="xs" c="dimmed" truncate="end">
            {file.name}
          </Text>
          <ActionIcon variant="filled" radius="lg" color="red" onClick={onRemove} pos="absolute" top={0} right={0}>
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      </Card.Section>
    </Card>
  );
}

function ReportDescriptionForm({ initialValues, onChange }) {

  const [reportBody, setReportBody] = useState(initialValues.body);
  const [images, setImages] = useState(initialValues.images);
  const [files, setFiles] = useState(initialValues.files);

  useEffect(() => {
    onChange({body: reportBody, images, files}); 
  }, [reportBody, images.length, files.length]); 

  const removeImage = (index) => setImages(images.filter((_, i) => i !== index));
  const removeFile = (index) => setFiles(files.filter((_, i) => i !== index));

  const imagePreviews = images.map((file, index) => {
    return <ImagePreview key={index} file={file} onRemove={() => removeImage(index)} />;
  });
  const filePreviews = files.map((file, index) => {
    return (
      <Card key={index} withBorder radius="md" p="xs">
        <Group justify="space-between">
          <Stack gap={0}>
            <Text size="xs" c="black" truncate="end">
              {file.name}
            </Text>
            <Text size="xs" c="dimmed" truncate="end">
              {formatFileSize(file.size)}
            </Text>
          </Stack>
          <ActionIcon variant="filled" radius="lg" color="red" onClick={() => removeFile(index)}>
            <IconTrash size="1rem" />
          </ActionIcon>
        </Group>
      </Card>
    ); 
  });


  return (
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
            value={reportBody}
            onChange={(event) => {setReportBody(event.currentTarget.value);}}
            >
          </Textarea> 

          <Group justify="flex-end" pr="xs" gap="0">
            <FileButton multiple onChange={(files) => setImages(prev => [...prev, ...files])} accept="image/png,image/jpeg,image/jpg">
              {(props) => (
              <Button variant="transparent" {...props} color="gray" leftSection={<IconPhoto size="1rem"  />} px="xs">
                Add Photos 
              </Button>
              )}
            </FileButton>
            <FileButton multiple onChange={(addedFiles) => setFiles(prev => [...prev, ...addedFiles])} >
              {(props) => (
              <Button variant="transparent" {...props} color="gray" leftSection={<IconPaperclip size="1rem"  />} px="xs">
                Attach Files  
              </Button>
              )}
            </FileButton>
          </Group>
          
          <Stack>
          {images.length > 0 && (
            <>
            <Text size="sm" c="dimmed">
              {images.length} images added 
            </Text>

            <SimpleGrid cols={4} spacing="xs" >
              {imagePreviews}
            </SimpleGrid>
            </>
          )}

          {files.length > 0 && (
            <>
            <Text size="sm" c="dimmed">
              {files.length} files added
            </Text>
            <Stack>
              {filePreviews}
            </Stack>
            </>
          )}
          </Stack>

        </FieldStack>
      </Grid.Col>
    </Grid> 
  ); 
}

export function SubmitReportForm() {

  const locationsJsonQuery = useQuery({
    queryKey: ["locations-json"],
    queryFn: () => fetch("/storage/locations.json").then((res) => res.json()),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    cacheTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const [opened, {toggle}] = useDisclosure(false); 
  const { hovered, ref } = useHover();
  
  const [reportDetails, setReportDetails] = useState({
    body: '', 
    images: [], 
    files: []
  }); 
  const [reportCategories, setReportCategories] = useState([]); 
  const [reportSubjectEntities, setReportSubjectEntities] = useState([]); 
  const [reportLocation, setReportLocation] = useState({
    province: '', 
    municipality: '', 
    barangay: ''
  }); 

  const submitReportRequest = useForm({
    detail_body: '', 
    detail_images: [], 
    detail_files: [], 
    categories: [], 
    subject_entities: [], 
    locations: []
  }); 

  const handleSubmit = () => {
      if (submitReportRequest.data.detail_body.length <= 0 
        && submitReportRequest.data.detail_files.length <= 0 
          && submitReportRequest.data.detail_images.length <= 0) {
      notifications.show({
        color: "red", 
        title: 'Report details required.', 
        message: 'You must provide at least a written report, or an image or a file to submit a report.'
      }); 
      return; 
    }

    submitReportRequest.post(route('submit.save')); 
  }

  return (
  <Card shadow="xs" padding="lg" radius="md">
    <Card.Section withBorder py="lg" px="md">
      <ReportDescriptionForm 
        initialValues={{
          body: submitReportRequest.data.detail_body, 
          images: submitReportRequest.data.detail_images, 
          files: submitReportRequest.data.detail_files
        }} 
        onChange={({body, images, files}) => {  
          submitReportRequest.setData('detail_body', body); 
          submitReportRequest.setData('detail_images', images); 
          submitReportRequest.setData('detail_files', files); 
        }} />
    </Card.Section>
    <Card.Section withBorder bg={hovered ? "rgba(0, 0, 0, 0.025)" : ""}>
      <Box onClick={toggle} style={{cursor: "pointer"}} p="lg" ref={ref}> 
        <Group c="dark" gap="0.3rem">
          <ThemeIcon variant="white" color="gray">
            <IconInfoCircle />
          </ThemeIcon>
          <Text size="sm" fw="bold">Additonal information</Text>
        </Group>
      </Box>
      <Collapse in={opened} px="3.5rem" pb="lg">
        <Stack gap="lg">

          <ReportNatureForm 
            initialValues={{categories: submitReportRequest.data.categories}} 
            onChange={(categories) => submitReportRequest.setData('categories', categories)} />
          <ReportSubjectForm 
            initialValues={{subjects: submitReportRequest.data.subject_entities}} 
            onChange={(subjects) => submitReportRequest.setData('subject_entities', subjects)} 
          />
          <ReportLocationForm 
            locations={ !locationsJsonQuery.isSuccess ? {} : locationsJsonQuery.data } 
            initialValues={submitReportRequest.data.locations.length > 0 ? submitReportRequest.data.locations[0] : {}}
            onLocationChange={({province, municipality, barangay}) => submitReportRequest.setData('locations', province ? [{province, municipality, barangay}] : [])} 
            />

        </Stack>
      </Collapse>
    </Card.Section>
    <Card.Section withBorder p="md">
      <Group justify="flex-end">
        <Button 
          radius="md" 
          variant="primary"
          onClick={handleSubmit}
          leftSection={<IconSend size="1rem" />}
          size="md"
          >Submit</Button>
      </Group>
    </Card.Section>
  </Card>    
  ); 
}

function SubmitReport() {

  const locationsJsonQuery = useQuery({
    queryKey: ["locations-json"],
    queryFn: () => fetch("/storage/locations.json").then((res) => res.json()),
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    cacheTime: 1000 * 60 * 60 * 24, // 1 day
  });

  const [reportDetail, setReportDetail] = useState({
    body: "",
    images: [],
    files: [],
  });
  const [reportCategories, setReportCategories] = useState([]); 

  const [active, setActive] = useState(0);

  const nextStep = () => {
    if (active >= 3) SubmitReport(); 
    setActive((prev) => prev + 1);
  }
  const prevStep = () => setActive((prev) => prev - 1);

  const __locations = (() => {
    if (locationsJsonQuery.isLoading) {
      return (
        <Container size="sm" py="2rem">
          <Text size="sm" c="dimmed">
            Loading locations...
          </Text>
        </Container>
      );
    } else {
      if (locationsJsonQuery.isError) {
        return (
          <Container size="sm" py="2rem">
            <Text size="sm" c="red">
              Error loading locations. ({locationsJsonQuery.error.message})
            </Text>
          </Container>
        );
      } else {
        return (
          <ReportLocationForm locations={locationsJsonQuery.data} />
        );
      }
    }
  })(); 

  return (
    <Container size="sm" py="2rem">
      <Stack gap="lg">
        <Group gap="xs">
          <IconFileText size="1.4rem" />
          <Text size="1.2rem" fw="bolder">
            File a report
          </Text>
        </Group>

        <SubmitReportForm />

      </Stack>
    </Container>
  ); 

}

SubmitReport.layout = (page) => <Layout>{page}</Layout>; 

export default SubmitReport; 