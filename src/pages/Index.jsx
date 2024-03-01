import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Text, VStack, List, ListItem, useToast, Input } from "@chakra-ui/react";
import { FaPlay, FaStop } from "react-icons/fa";

const isPrime = (num) => {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) if (num % i === 0) return false;
  return num > 1;
};

const Index = () => {
  const [initialExponent, setInitialExponent] = useState(2);
  const [isComputing, setIsComputing] = useState(false);
  const [foundPrimes, setFoundPrimes] = useState([]);
  const toast = useToast();

  useEffect(() => {
    let worker;
    if (isComputing) {
      worker = setInterval(() => {
        const candidate = 2 ** (initialExponent + foundPrimes.length) - 1;
        if (isPrime(candidate)) {
          setFoundPrimes((prevPrimes) => [...prevPrimes, candidate]);
          toast({
            title: "New Mersenne Prime Found!",
            description: `A new Mersenne prime has been found: ${candidate}`,
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      }, 100);
    }

    return () => {
      if (worker) {
        clearInterval(worker);
      }
    };
  }, [isComputing, foundPrimes.length, toast]);

  const handleStart = () => setIsComputing(true);
  const handleStop = () => setIsComputing(false);

  return (
    <Container>
      <VStack spacing={4} as="article" my={10}>
        <Heading as="h1" size="xl">
          Mersenne Prime Generator
        </Heading>
        <Text>Join the quest to find new Mersenne primes! Click start to begin the computation.</Text>
        <Box as="form" onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Enter initial exponent" size="md" type="number" value={initialExponent} onChange={(e) => setInitialExponent(Number(e.target.value))} mr={2} />
          <Button leftIcon={<FaPlay />} colorScheme="green" onClick={handleStart} isDisabled={isComputing} mr={2}>
            Start
          </Button>
          <Button leftIcon={<FaStop />} colorScheme="red" onClick={handleStop} isDisabled={!isComputing}>
            Stop
          </Button>
        </Box>
        <Heading as="h2" size="md">
          Found Mersenne Primes:
        </Heading>
        <List>
          {foundPrimes.map((prime, index) => (
            <ListItem key={index}>{`2^${index + 2} - 1 = ${prime}`}</ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;
