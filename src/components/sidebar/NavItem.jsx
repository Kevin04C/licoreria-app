import { Flex, Icon, Link, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

export const NavItem = ({ children, icon, href = '#', ...rest }) => {
  const router = useRouter()

  const isRouteActive = useMemo(() => router.pathname === href, [router, href])
  const stylesActive = {
    bg: 'facebook.900',
    color: 'white'
  }

  return (
    <Link
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'facebook.900',
          color: 'white'
        }}
        padding={3}
        transition="all .1s ease"
        {...rest}
        __css={{ ...(isRouteActive && stylesActive) }}
        display="flex"
        alignItems="center"
        justifyContent="flex-start"
      >
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
        <Text>
         {children}
        </Text>
      </Flex>
    </Link>
  )
}
