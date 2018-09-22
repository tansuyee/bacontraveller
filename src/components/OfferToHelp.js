import React from 'react';
import {Grid, Header, Form, Divider, Input, Image, Button, Container} from 'semantic-ui-react';
import styles from '../static/css/OfferToHelp.module.css';

const paymentOptions = [
    { key: 'PayPal', text: 'PayPal', value: 'PayPal' },
    { key: 'Bank Transfer', text: 'Bank Transfer', value: 'Bank Transfer' },
    { key: 'Others', text: 'Others', value: 'Others' },
];

const deliveryOptions = [
    { key: 'RegisteredMail', text: 'Registered Mail', value: 'RegisteredMail' },
    { key: 'NormalMail', text: 'Normal Mail', value: 'NormalMail' },
    { key: 'Others', text: 'Others', value: 'Others' },
];

const OfferToHelp = () => (
    <div className={styles.container}>    
        <Grid container>
            <Grid.Row>
                <Grid.Column>
                    <div className={styles.header}>
                        <Button icon ="arrow left" inverted color="teal" />
                    </div>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={3}>
                    <Image src='https://www.marltonjoecanals.com/images/sites/marltonjoecanals/labels/modelo-modelo-6-pack-bottles_1.jpg' />
                </Grid.Column>
                <Grid.Column width={13}>
                    <Header>
                        <span>Stockholms Branneri Dry Gin</span><br/>
                        <span>Willing to pay </span>
                        <span className={styles.amount}>$100</span>
                        <Header.Subheader>
                                <span>Buy from </span>
                                <span className={styles.dealLocation}>Sweden</span>
                                <span>, deal in </span>
                                <span className={styles.dealLocation}>Singapore</span>
                        </Header.Subheader>
                    </Header>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Divider />
        <div>
            <div class={styles.details}>
                <Form>
                    <Form.Field inline>
                        <label>Offer Price </label>
                        <Input transparent placeholder='$100' />
                    </Form.Field>
                    <Divider />
                    <Form.Field inline>
                        <label>Return Date </label>
                        <Input transparent placeholder='16-09-2018' />
                    </Form.Field>
                    <Divider />
                    <Form.Field inline>
                        <Form.Select fluid label='Payment Methods' options={paymentOptions} placeholder='Choose' />
                    </Form.Field>
                    <Form.Field inline>
                        <Form.Select className={styles.dropdown} fluid label='Delivery Methods' options={deliveryOptions} placeholder='Choose' />
                    </Form.Field>
                    <Button fluid positive type='submit'>Next</Button>
                </Form>
            </div>
         </div>
    </div>
 );

export default OfferToHelp;