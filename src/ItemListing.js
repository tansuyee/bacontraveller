import React, { Component } from 'react';
import { Button, Card, Grid, Header, Image } from 'semantic-ui-react';
import styles from './ItemListing.module.css';

class ItemListing extends Component {

  render() {

    const Item = () => (
        <Card>
            <Image src='https://via.placeholder.com/400x400' />
            <Image className={styles.itemAuthor} src="https://randomuser.me/api/portraits/women/68.jpg" size='mini' circular centered />
            <Card.Content className={styles.itemContent} textAlign='center'>
                <Card.Header className={styles.itemName}>Rubbish Souvenir</Card.Header>
                <Card.Meta className={styles.itemMeta}>Willing to pay $20</Card.Meta>
                <Card.Description>
                    <Button className={styles.itemStatus} size='mini'>OPEN</Button>
                </Card.Description>
            </Card.Content>
        </Card>
    )

    return (
      <div className={styles.container}>
          <Grid container>
              <Grid.Row>
                  <Grid.Column>
                      <Header className={styles.title} as='h1'>
                          <span>Hong Kong</span>
                          <Header.Subheader className={styles.titleSubheader}>Leberkas biltong hamburger, bacon sausage swine capicola. </Header.Subheader>
                      </Header>
                  </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                  <Grid.Column>
                      <Card.Group className={styles.itemList} itemsPerRow={2}>
                          <Item />
                          <Item />
                          <Item />
                          <Item />
                          <Item />
                          <Item />
                          <Item />
                          <Item />
                      </Card.Group>
                  </Grid.Column>
              </Grid.Row>
          </Grid>
      </div>
    );
  }
}

export default ItemListing;
