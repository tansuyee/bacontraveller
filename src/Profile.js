import React from 'react'
import { Grid, Icon, Header, Card, Image, Statistic, Feed, Sidebar, Button, Menu } from 'semantic-ui-react'
import styles from './Profile.module.css'

const items = [
    { key: 'dealClosed', label: 'Deal Closed', value: '22' },
    { key: 'citiesVisited', label: 'Cities Visited', value: '18' },
    { key: 'followers', label: 'Followers', value: '31,200' },
]

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = { isSidebarVisible: false }

        this.onClickMenu = this.onClickMenu.bind(this)
    }

    onClickMenu = () => this.setState({ isSidebarVisible: !this.state.isSidebarVisible })
    onSidebarHidden = () => this.setState({ isSidebarVisible: false })

    render() {
        const { isSidebarVisible } = this.state

        return (
            <div className={styles.container}>
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='slide along' visible={isSidebarVisible} width='thin' onHide={this.onSidebarHidden} inverted vertical>
                        <Menu.Item as='a'>Home</Menu.Item>
                    </Sidebar>

                    <Sidebar.Pusher className={styles.pusher}>
                        <Grid container>
                            <Grid.Row>
                                <Grid.Column className={styles.menu} floated='left' width={5} textAlign="left">
                                    <Icon name='th' size='big' onClick={this.onClickMenu} link />
                                </Grid.Column>
                                <Grid.Column className={styles.search} floated='right' width={5} textAlign='right'>
                                    <Icon name='search' size='big' />
                                </Grid.Column>
                            </Grid.Row>
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
                            <Grid.Row>
                                <Grid.Column>
                                    <Statistic.Group className={styles.statistics} widths='three' items={items} size='tiny' color='grey' />
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                        <div className={styles.subContainer}>
                            <Grid container>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header className={styles.plannedTripTitle}>Planned Trips</Header>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Feed className={styles.plannedTripContent}>
                                            <Feed.Event>
                                                <Feed.Label>
                                                    <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
                                                </Feed.Label>
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        <Feed.User>Elliot Fu</Feed.User> added you as a friend
          <Feed.Date>1 Hour Ago</Feed.Date>
                                                    </Feed.Summary>
                                                    <Feed.Meta>
                                                        <Feed.Like>
                                                            <Icon name='like' />
                                                            4 Likes
          </Feed.Like>
                                                    </Feed.Meta>
                                                </Feed.Content>
                                            </Feed.Event>

                                            <Feed.Event>
                                                <Feed.Label image='https://react.semantic-ui.com//images/avatar/small/helen.jpg' />
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        <a>Helen Troy</a> added <a>2 new illustrations</a>
                                                        <Feed.Date>4 days ago</Feed.Date>
                                                    </Feed.Summary>
                                                    <Feed.Extra images>
                                                        <a>
                                                            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                                        </a>
                                                        <a>
                                                            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                                        </a>
                                                    </Feed.Extra>
                                                    <Feed.Meta>
                                                        <Feed.Like>
                                                            <Icon name='like' />
                                                            1 Like
          </Feed.Like>
                                                    </Feed.Meta>
                                                </Feed.Content>
                                            </Feed.Event>

                                            <Feed.Event>
                                                <Feed.Label image='https://react.semantic-ui.com//images/avatar/small/jenny.jpg' />
                                                <Feed.Content>
                                                    <Feed.Summary date='2 Days Ago' user='Jenny Hess' content='add you as a friend' />
                                                    <Feed.Meta>
                                                        <Feed.Like>
                                                            <Icon name='like' />
                                                            8 Likes
          </Feed.Like>
                                                    </Feed.Meta>
                                                </Feed.Content>
                                            </Feed.Event>

                                            <Feed.Event>
                                                <Feed.Label image='/images/avatar/small/joe.jpg' />
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        <a>Joe Henderson</a> posted on his page
          <Feed.Date>3 days ago</Feed.Date>
                                                    </Feed.Summary>
                                                    <Feed.Extra text>
                                                        Ours is a life of constant reruns. We're always circling back to where we'd we started,
                                                        then starting all over again. Even if we don't run extra laps that day, we surely will
                                                        come back for more of the same another day soon.
        </Feed.Extra>
                                                    <Feed.Meta>
                                                        <Feed.Like>
                                                            <Icon name='like' />
                                                            5 Likes
          </Feed.Like>
                                                    </Feed.Meta>
                                                </Feed.Content>
                                            </Feed.Event>

                                            <Feed.Event>
                                                <Feed.Label image='https://react.semantic-ui.com//images/avatar/small/justen.jpg' />
                                                <Feed.Content>
                                                    <Feed.Summary>
                                                        <a>Justen Kitsune</a> added <a>2 new photos</a> of you
          <Feed.Date>4 days ago</Feed.Date>
                                                    </Feed.Summary>
                                                    <Feed.Extra images>
                                                        <a>
                                                            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                                        </a>
                                                        <a>
                                                            <img src='https://react.semantic-ui.com/images/wireframe/image.png' />
                                                        </a>
                                                    </Feed.Extra>
                                                    <Feed.Meta>
                                                        <Feed.Like>
                                                            <Icon name='like' />
                                                            41 Likes
          </Feed.Like>
                                                    </Feed.Meta>
                                                </Feed.Content>
                                            </Feed.Event>
                                        </Feed>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default Profile