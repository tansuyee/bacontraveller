import React from 'react'
import { Grid, Header, Icon, Comment, Divider, Button, Item, Image } from 'semantic-ui-react'
import styles from './ItemDetail.module.css'

const SampleComment = () => (
    <Comment>
        <Comment.Avatar as={Image} src='https://randomuser.me/api/portraits/women/40.jpg' circular />
        <Comment.Content>
            <Comment.Author className={styles.commentAuthorName}>Jane Doe</Comment.Author>
            <Comment.Text>Shank shoulder picanha corned beef meatball, drumstick kielbasa sirloin brisket. Sirloin pork bresaola biltong leberkas kielbasa.</Comment.Text>
            <Comment.Actions className={styles.commentActions}>
                <Comment.Action>
                    <Icon name='reply' size='small' />
                    <span> REPLY</span>
                </Comment.Action>
            </Comment.Actions>
        </Comment.Content>
    </Comment>
)

const ItemDetail = () => (
    <div className={styles.container}>
        <Grid container>
            <Grid.Row>
                <Grid.Column className={styles.menu} floated='left' width={5} textAlign="left">
                    <Icon name='th' size='big' link />
                </Grid.Column>
                <Grid.Column className={styles.search} floated='right' width={5} textAlign='right'>
                    <Icon name='search' size='big' />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Item className={styles.author}>
                        <Item.Image className={styles.authorImage} src='https://randomuser.me/api/portraits/women/40.jpg' size='small' floated='left' />
                        <Item.Content>
                            <Item.Header className={styles.authorMeta}>
                                <span>Requested by </span>
                                <span className={styles.authorName}>Jane Doe</span>
                                <Header.Subheader className={styles.datePosted}>Posted 3 days ago</Header.Subheader>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Header className={styles.itemTitle}>Stockholms Branneri Dry Gin</Header>
                    <p className={styles.itemDescription}>Shoulder fatback turducken ham corned beef pork chicken leberkas pork chop sirloin ribeye short ribs. Porchetta buffalo meatball meatloaf jowl beef. Sirloin venison t-bone porchetta. Ball tip porchetta cupim pastrami, spare ribs jowl salami beef ribs.</p>
                    <Divider horizontal>
                        <Icon className={styles.descriptionExpand} name='angle double down' />
                    </Divider>
                    <Header className={styles.dealDetails}>
                        <Button className={styles.offerToHelp} floated='right' size='mini'>OFFER TO HELP</Button>
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
            <Grid.Row>
                <Grid.Column>
                    <Header className={styles.commentSection}>Comments</Header>
                    <Divider fitted />
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Comment.Group>
                        <SampleComment />
                        <SampleComment />
                        <SampleComment />
                    </Comment.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)

export default ItemDetail