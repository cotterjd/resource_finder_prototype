import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Grid,
  Select,
  Flex,
  theme,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import './App.css'
import data from './resources'
import add from 'date-fns/add'

const getClass = dev => {
  if (dev.available) return 'available'
  
  const dateAvailable = new Date(dev.dateAvailable).getTime()
  const oneMonthFromNow = add(new Date(), { months: 1 }).getTime()
  console.log(dateAvailable, oneMonthFromNow)
  if (dateAvailable < oneMonthFromNow) return `almost`

  return ``
}
export const App: React.FC<any> = (): JSX.Element => {
  const [visibleDevs, setVisibleDevs] = React.useState(data)
  const [qualifier, setQualifier] = React.useState(``)
  const [level, setLevel] = React.useState(0)
  const [skill, setSkill] = React.useState(``)
  const [project, setProject] = React.useState(``)
  const [isProjectModalOpen, setIsProjectModalOpen] = React.useState(false)

  const onChangeSkill = (skill) => {
    console.log(skill)
    // if (!level && !qualifier) return settSkill()
  }
  const onChangeLevel = () => {
  }
  const onChangeQualifier = () => {
  }
  const onFilterProject = (project: string): void => {
    setProject(project)
    setIsProjectModalOpen(true)
  }
  return <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
        <Flex>
          <Select placeholder="Select a Skill" onChange={onChangeSkill}>
            <option>Java</option>
            <option>C#</option>
            <option>React</option>
            <option>Vue</option>
            <option>Node</option>
            <option>Flutter</option>
            <option>ReactNative</option>
            <option>AzureDevOps</option>
            <option>AWS</option>
            <option>Mongo</option>
            <option>SQL</option>
          </Select>
          <Select onChange={onChangeQualifier}>
            <option>At or Above</option>
            <option>Equal To</option>
          </Select>
          <Select placeholder="Select a Level" onChange={onChangeLevel}>
            <option>10</option>
            <option>9</option>
            <option>8</option>
            <option>7</option>
            <option>6</option>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
          </Select>
        </Flex>
        <Table colorScheme='teal'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Current Project</Th>
              <Th>Date Available</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              visibleDevs.map(x => (
                <Tr className={getClass(x)}>
                  <Td>{x.name}</Td>
                  <Td className="clickable" onClick={_ => onFilterProject(x.project)}>{x.project}</Td>
                  <Td>{x.dateAvailable}</Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
        </VStack>
      </Grid>
    </Box>
    <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{project}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table colorScheme='teal'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Current Project</Th>
                <Th>Date Available</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                data.filter(x => x.project === project).map(x => (
                  <Tr className={getClass(x)}>
                    <Td>{x.name}</Td>
                    <Td className="clickable" onClick={_ => onFilterProject(x.project)}>{x.project}</Td>
                    <Td>{x.dateAvailable}</Td>
                  </Tr>
                ))
              }
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={_ => setIsProjectModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </ChakraProvider>
}
