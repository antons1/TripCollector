import React from 'react';
import { Heading } from '../components/Heading';
import { Image } from '../components/Image';
import { Content } from '../components/layout/Content';

import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';

export function Index({ }) {
    return (
        <Content>
            <Heading level={2}>Gjenopplev turene dine</Heading>
            <p>
                Samle sammen bilder fra deg selv og de du er på tur sammen med. Legg til titler, tekster, kart
                og andre elementer som kan gi deg en måte å se tilbake på turene dine på.
            </p>
            <Image src={img1} />
            <p>
                I stedet for å dele mapper og lenker og ha bildene dine liggende i en svær haug du aldri ser på, 
                kan du lage en digital minnebok hvor hver enkelt av deltakerne kan gå inn og legge til sine minner.
            </p>
            <Image src={img2} />
            <p>
                Du velger om du ønsker å være den som bestemmer hvordan det skal se ut, mens de andre fra turen kan 
                legge til elementer du kan bruke, eller om alle skal kunne redigere og plassere bilder.
            </p>
            <Image src={img3} />
        </Content>
    )
}