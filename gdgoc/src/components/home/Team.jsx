import React from 'react';
import { Box, Heading, Text, SimpleGrid,  VStack } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
const teamMembers = [
  {
    name: 'Sanskar Lohani',
    position: 'CEO',
    photo: '/sanskar.jpg',
  },
  {
    name: 'Sakshi Prasad Singh',
    position: 'CTO',
    photo: '/Sakshi.jpg',
  },
  {
    name: 'tanushree Tripathy',
    position: 'Designer',
    photo: '/lead.jpg',
  },
  {
    name: 'Jay Dev ',
    position: 'Developer',
    photo: '/jd.jpg',
  },
  {
    name: 'manish kumar jha',
    position: 'Developer',
    photo: '/manish.JPG',
  },
  {
    name: 'Bob Brown',
    position: 'Developer',
    photo: '/manish.JPG',
  },
  {
    name: 'Bob Brown',
    position: 'Developer',
    photo: '/manish.JPG',
  },
];

const TeamPage = () => {
  return (
    <Box maxW="1200px" mx="auto" py="10" px="6">
      <Heading textAlign="center" mb="10" fontSize="4xl">
        Meet Our Team
      </Heading>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing="6">
        {teamMembers.map((member, index) => (
          <VStack
            key={index}
            spacing="4"
            p="6"
            borderWidth="1px"
            borderRadius="lg"
            boxShadow="md"
            align="center"
            bg="white"
            _hover={{ transform: 'scale(1.05)', transition: '0.3s' }}
          >
           <Image
      height="150px"
	  fit={'cover'}
	  aspectRatio={1}
	  borderRadius={'full'}
      src={member.photo}
    />
            <Text fontWeight="bold" fontSize="lg">
              {member.name}
            </Text>
            <Text color="gray.500">{member.position}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TeamPage;
