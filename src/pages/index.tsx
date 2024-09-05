// import { CSSProperties, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { Container, Stack, Form, Row } from 'react-bootstrap'

// import { Loader } from '@/components/_commons/Loader'
// import { Button } from '@/components/_commons/Form/Button'
// import { SmartTable } from '@/components/_commons/SmartTable'
import { TitleHeader } from '@/components/_commons/Layout/Private/Header'

import { CardWrapper, CardHeader, CardBody } from '@/components/_commons/Card'

// import { Users } from '@/core/domain/Users'
// import { UserSearch } from '@/core/domain/Users/Users.types'

export const UsersPage = () => {
  // const navigate = useNavigate()
  // const [queryParams, setQueryParams] = useState<UserSearch>({
  //   current_page: 1,
  //   items_per_page: 15
  // })
  // const { data: users, isLoading: loadingUsers } =
  //   Users.useGetUserSearch(queryParams)

  // const [current, setCurrent] = useState(1)
  // const [usersRows, setUsersRows] = useState<Array<any>>([])
  // const [nameFilter, setNameFilter] = useState('')
  // const [emailFilter, setEmailFilter] = useState('')
  // // const total = Number(users?.last_page)
  // const handleEditPermission = (id: number) => {
  //   navigate('../' + id + '/edit-permission', { replace: true })
  // }
  // const handleEditUser = (id: number) => {
  //   navigate('../' + id + '/edit', { replace: true })
  // }

  // const handleName = (e: any) => {
  //   setNameFilter(e.target.value)
  // }

  // const handleEmail = (e: any) => {
  //   setEmailFilter(e.target.value)
  // }

  // const usrsFilter: Array<any> = []

  // useEffect(() => {
  //   const usrs: Array<any> = []
  //   if (users) {
  //     const data: Array<any> = users.data ? users.data : []
  //     data.forEach(usr => {
  //       usrs.push({
  //         ...usr,
  //         actions: (
  //           <div className="d-flex justify-content-center">
  //             <Button
  //               size="sm"
  //               title="Permissões"
  //               variant="outline-secondary"
  //               className="border-0 outline-secondary"
  //               onClick={() => {
  //                 handleEditPermission(usr.id)
  //               }}
  //             >
  //               <i className="fa fa-user-tag" />
  //             </Button>
  //             <Button
  //               size="sm"
  //               title="Editar"
  //               variant="outline-secondary"
  //               className="border-0 outline-secondary"
  //               onClick={() => {
  //                 handleEditUser(usr.id)
  //               }}
  //             >
  //               <i className="fa fa-pencil-alt" />
  //             </Button>
  //           </div>
  //         )
  //       })
  //     })
  //   }
  //   setUsersRows(usrs)
  //   usrs
  //     .filter(({ name, email }) => {
  //       if (nameFilter)
  //         return name.toLowerCase().includes(nameFilter.toLowerCase())
  //       else if (emailFilter)
  //         return email.toLowerCase().includes(emailFilter.toLowerCase())
  //       else return true
  //     })
  //     .forEach(e => {
  //       usrsFilter.push(e)
  //       setUsersRows(usrsFilter)
  //     })
  // }, [users, nameFilter, emailFilter, queryParams])

  return (
    <Container fluid className="content">
      <Stack gap={3}>
        <TitleHeader title="Usuários" />
        {/* <UsersSearchFilterCard onSearch={handleSearch} /> */}
        <CardWrapper>
          <CardHeader>Filtros</CardHeader>
          <CardBody>
            <Row className="mb-2">
              <Stack gap={4}>
                <Row>
                  <div className="row d-flex">
                    <Form.Group className="mb-3 col-md-6">
                      <Form.Label>Nome</Form.Label>
                      {/* <Form.Control onChange={handleName} placeholder="Nome" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3 col-md-6">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        // onChange={handleEmail}
                        placeholder="Email"
                      />
                    </Form.Group>
                  </div>
                </Row>
              </Stack>
            </Row>
          </CardBody>
        </CardWrapper>

        <CardWrapper>
          <CardHeader>Lista</CardHeader>

          <CardBody>
            <></>
            {/* <Loader loading={loadingUsers}>
              <div className="py-2">
                <SmartTable
                  columns={tableColumns}
                  data={usersRows}
                  pagination={{
                    current,
                    total,
                    onPaginate(page) {
                      setCurrent(page)
                      setQueryParams({
                        ...queryParams,
                        current_page: page
                      })
                    }
                  }}
                  hoverable
                  stripped
                />
              </div>
            </Loader> */}
          </CardBody>
        </CardWrapper>
      </Stack>
    </Container>
  )
}

// const tableColumns = [
//   { label: 'Nome', key: 'name' },
//   { label: 'Email', key: 'email' },
//   {
//     label: 'Ações',
//     key: 'actions',
//     headerCellStyle: { width: '60px', textAlign: 'center' } as CSSProperties
//   }
// ]
