import React from 'react'
import { Card } from 'react-bootstrap'

function Textbox () {
  return (
    <div className='CardDeck'>
      <Card style={{ width: '18rem' }} className='card'>
        <Card.Body className='cardBody'>
          <Card.Title
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '600',
              fontSize: '120%',
              marginBottom: '10%'
            }}
					>
            {'\u00A0'}
						Changelogs:
					</Card.Title>
          <div className='card2'>
            <Card.Text>
							• lorem<br />
							• ipsum<br />
							• dolores sit amet<br />
              <br />
              {'\u00A0'}Date: 31 February 2021
						</Card.Text>
          </div>
        </Card.Body>
      </Card>
      <a
        href='https://firebasestorage.googleapis.com/v0/b/in-covid-e0229.appspot.com/o/in-COVID%20v1.0.2%2B3.apk?alt=media&token=ec750afe-0a78-4cee-bd12-c04b12fd77eb'
        className='button1'
        target='_blank'
			>
				DOWNLOAD LATEST APK
			</a>
    </div>
  )
}

export default Textbox
