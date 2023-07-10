import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Icon,
  Text
} from '@chakra-ui/react'

export const MenuAccordion = ({ menuText, icon, children }) => {
  return (
    <Box>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                <Flex alignItems="center">
                  {icon && (
                    <Icon
                      mr="3"
                      fontSize="18"
                      _groupHover={{
                        color: 'white'
                      }}
                      as={icon}
                    />
                  )}
                  <Text>{menuText}</Text>
                </Flex>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel py={3}>
            <Flex direction="column" gap={2}>
              {children}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
