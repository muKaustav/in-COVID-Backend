import React from 'react'
import Form from './Form'

function Footer () {
  return (
    <footer>
      <section class='ft-main'>
        <div class='ft-main-item'>
          <h2 class='ft-title'>Resources</h2>
          <ul>
            <li>
              <a
                href='https://timesofindia.indiatimes.com/india/coronavirus-in-india-covid-19-cases-black-fungus-news-live-updates-22-may-2021/liveblog/82847835.cms'
                target='_blank'
                rel='noopener noreferrer'
							>
								News
							</a>
            </li>
            <li>
              <a
                href='https://www.covid19india.org/'
                target='_blank'
                rel='noopener noreferrer'
							>
								Statistics
							</a>
            </li>
            <li>
              <a
                href='https://indianhelpline.com/'
                target='_blank'
                rel='noopener noreferrer'
							>
								Helplines
							</a>
            </li>
            <li>
              <a
                href='https://www.mohfw.gov.in/'
                target='_blank'
                rel='noopener noreferrer'
							>
								Ministry of Health and Family Welfare
							</a>
            </li>
          </ul>
        </div>
        <div class='ft-main-item'>
          <h2 class='ft-title'>Stay Updated</h2>
          <p>Subscribe to our newsletter to get our latest news.</p>
          <Form />
        </div>
      </section>
      <section class='ft-social'>
        <ul class='ft-social-list'>
          <li>
            <a
              href='https://twitter.com/incovid1'
              target='_blank'
              rel='noopener noreferrer'
						>
              <i class='fab fa-twitter' />
            </a>
          </li>
          <li>
            <a
              href='https://www.instagram.com/in_covid'
              target='_blank'
              rel='noopener noreferrer'
						>
              <i class='fab fa-instagram' />
            </a>
          </li>
          <li>
            <a
              href='https://discord.gg/MU9bUThEqf'
              target='_blank'
              rel='noopener noreferrer'
						>
              <i class='fab fa-discord' />
            </a>
          </li>
        </ul>
      </section>
      <section class='ft-legal'>
        <ul class='ft-legal-list'>
          <li>
            <a
              href='https://firebasestorage.googleapis.com/v0/b/in-covid-e0229.appspot.com/o/Disclaimer.pdf?alt=media&token=7053eb38-cab4-42c5-abe9-551827638063'
              target='_blank'
              rel='noopener noreferrer'
						>
							Disclaimer
						</a>
          </li>
          <li>&copy; 2021 in-COVID</li>
        </ul>
      </section>
    </footer>
  )
}

export default Footer
