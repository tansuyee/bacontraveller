import React from 'react'
import { Grid, Header, Form } from 'semantic-ui-react'
import styles from './Register.module.css'

const Register = () => (
    <div className={styles.container}>
        <Grid className={styles.grid} verticalAlign='middle' centered container>
            <Grid.Column>
                <Form size='huge'>
                    <Form.Field>
                        <Header className={styles.logo} textAlign='center'>
                            <span>BACON IPSUM</span>
                            <Header.Subheader className={styles.logoSubheader}>Bacon ipsum dolor amet shank andouille jowl pastrami.</Header.Subheader>
                        </Header>
                    </Form.Field>
                    <Form.Input placeholder='Email Address' />
                    <Form.Input placeholder='Password' type='password' />
                    <Form.Button size='huge' fluid>SIGN IN</Form.Button>
                </Form>
            </Grid.Column>
        </Grid>
    </div>
)

export default Register