import React from 'react';
import { Table } from 'semantic-ui-react';

const Individus = ({data, onDelete, onUpdate, search}) => {
  return (
    <div>
        <Table sortable celled fixed>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Genre</Table.HeaderCell>
                    <Table.HeaderCell>Nom</Table.HeaderCell>
                    <Table.HeaderCell>Prenom</Table.HeaderCell>
                    <Table.HeaderCell>Date Nais</Table.HeaderCell>
                    <Table.HeaderCell>Ville Nais</Table.HeaderCell>
                    <Table.HeaderCell>Pay Nais</Table.HeaderCell>
                    <Table.HeaderCell>Nationalite</Table.HeaderCell>
                    <Table.HeaderCell>Numero Pass</Table.HeaderCell>
                    <Table.HeaderCell>Pays Pass</Table.HeaderCell>
                    <Table.HeaderCell>Date delivre Pass</Table.HeaderCell>
                    <Table.HeaderCell>Date expiration Pass</Table.HeaderCell>
                    <Table.HeaderCell>Update</Table.HeaderCell>
                    <Table.HeaderCell>Delete</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map(({ _id, genre, nom, prenom, naissance, ville, pays, nationalite, numeroPassport, paysPassport, deliverancePassport, expirationPassport }, i) => (
                <Table.Row key={i}  className={(_id === search._id) ? 'highlight' : ''}>
                    <Table.Cell>{genre}</Table.Cell>
                    <Table.Cell>{nom}</Table.Cell>
                    <Table.Cell>{prenom}</Table.Cell>
                    <Table.Cell>{naissance}</Table.Cell>
                    <Table.Cell>{ville}</Table.Cell>
                    <Table.Cell>{pays}</Table.Cell>
                    <Table.Cell>{nationalite}</Table.Cell>
                    <Table.Cell>{numeroPassport}</Table.Cell>
                    <Table.Cell>{paysPassport}</Table.Cell>
                    <Table.Cell>{deliverancePassport}</Table.Cell>
                    <Table.Cell>{expirationPassport}</Table.Cell>
                    <Table.Cell onClick={() => {onUpdate(_id); console.log(_id)}} className='updatebtn'>✓</Table.Cell>
                    <Table.Cell onClick={() => {onDelete(_id); console.log(_id)}} className='deletebtn'>x</Table.Cell>
                </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
  )
}

export default Individus