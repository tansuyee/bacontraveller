import React, { Component } from 'react';
import { Grid, Icon, Header, Card, Image, Label, Tab } from 'semantic-ui-react';
import styles from './Profile.module.css';

const items = [
    { key: 'dealClosed', label: 'Deal Closed', value: '22' },
    { key: 'citiesVisited', label: 'Cities Visited', value: '18' },
    { key: 'followers', label: 'Followers', value: '31,200' },
]

const tabs = [
    { menuItem: 'Requests', render: () => <Tab.Pane attached={false} basic>Tab1</Tab.Pane> },
    { menuItem: 'Closed Deals', render: () => <Tab.Pane attached={false} basic>Tab2</Tab.Pane> },
    { menuItem: 'Reviews', render: () => <Tab.Pane attached={false} basic>Tab3</Tab.Pane> },
]

class Profile extends Component {

    render() {
        return (
            <div className={styles.container}>
                <Grid container>
                    <Grid.Row>
                        <Grid.Column>
                            <Header className={styles.title} as='h1'>
                                <span>Pork belly kevin ham hock</span>
                                <Header.Subheader className={styles.titleSubheader}>Leberkas biltong hamburger, bacon sausage swine capicola. </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Card>
                                <Card.Content>
                                    <Image floated='left' size='tiny' src='https://randomuser.me/api/portraits/women/8.jpg' />
                                    <Card.Header>Steve Sanders
                        <Header.Subheader className={styles.rank}>Super Traveller</Header.Subheader>
                                    </Card.Header>
                                    <Card.Meta className={styles.bio}>
                                        Take only memories, leave only footprints.
                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <div className={styles.subContainer}>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Tab className={styles.tab} grid={{ paneWidth: 12, tabWidth: 6 }} menu={{ secondary: true, pointing: true, inverted: true}} panes={tabs} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Profile;
