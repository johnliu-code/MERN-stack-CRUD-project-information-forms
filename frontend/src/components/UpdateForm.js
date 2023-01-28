import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';

const UpdateForm = ({data, updateOneData, itemSelected}) => {
    //Get form data from user by useState and the states of conditions
        const [genre, setGenre] = useState('');
        const [nom, setNom] = useState('');
        const [prenom, setPrenom] = useState('');
        const [naissance, setNaissance] = useState('');
        const [ville, setVille] = useState('');
        const [pays, setPays] = useState('');
        const [nationalite, setNationalite] = useState('');
        const [numeroPassport, setNumeroPassport] = useState('');
        const [paysPassport, setPaysPassport] = useState('');
        const [deliverancePassport, setDeliverancePassport] = useState('');
        const [expirationPassport, setExpirationPassport] = useState('');

        const [individus, setIndividus] = useState({});
        const [updateSubmited, setUpdateSubmited] = useState(false);
        let id = data._id;

        const handleConfirm = () => {
            setUpdateSubmited(true);            
        }

        const handleUpdate = () => {
            updateOneData(id, individus); 
            console.log("updated");
        }

       useEffect(() => {
        if(itemSelected){
            setGenre(data.genre);
            setNom(data.nom);
            setPrenom(data.prenom);
            setNaissance(data.naissance);
            setVille(data.ville);
            setPays(data.pays);
            setNationalite(data.nationalite);
            setNumeroPassport(data.numeroPassport);
            setPaysPassport(data.paysPassport);
            setDeliverancePassport(data.deliverancePassport);
            setExpirationPassport(data.expirationPassport);
        }

        if(updateSubmited){
            console.log(updateSubmited); 
            setGenre(genre);
            setNom(nom);
            setPrenom(prenom);
            setNaissance(naissance);
            setVille(ville);
            setPays(pays);
            setNationalite(nationalite);
            setNumeroPassport(numeroPassport);
            setPaysPassport(paysPassport);
            setDeliverancePassport(deliverancePassport);
            setExpirationPassport(expirationPassport);

            setIndividus({id, genre, nom, prenom, naissance, ville, pays, nationalite, numeroPassport, paysPassport, deliverancePassport, expirationPassport});           
        }
        console.log(individus);

        
       }, [itemSelected, updateSubmited]);

        //Optios with example data
        const villeoptions = [
            { key: 'montreal', text: 'Montreal', value: 'Montreal' },
            { key: 'toronto', text: 'Toronto', value: 'Toronto' },
            { key: 'paris', text: 'Paris', value: 'Paris' },
            { key: 'lion', text: 'Lion', value: 'Lion' },
            { key: 'beijing', text: 'Beijing', value: 'Beijing' },
            { key: 'shenyang', text: 'Shenyang', value: 'Shenyang' },
        ]
    
        const paysoptions = [
            { key: 'canada', text: 'Canada', value: 'Canada' },
            { key: 'usa', text: 'USA', value: 'USA' },
            { key: 'china', text: 'China', value: 'China' },
        ]

  return (
    <div>
        <Form>
            <h3>{data._id}</h3>
            <Form.Group inline className='userformline'>
                <label>Genre</label>
                <Form.Radio
                    label='Homme'
                    value={'homme'}
                    name="genre"
                    checked={genre === 'homme'}
                    onChange={() => {setGenre('homme')}}
                />
                <Form.Radio
                    label='Femme'
                    value='femme'
                    name="genre"
                    checked= {genre === 'femme'}
                    onChange={() => {setGenre('femme')}}
                />
            </Form.Group> 

            <Form.Group inline className='userformline'>
                <label>Nom de famille</label>
                <Form.Input placeholder='Nom de famille' value={nom} onChange={(e) => setNom(e.target.value)} />            
            </Form.Group> 

            <Form.Group inline className='userformline'>
                <label>Prenom</label>
                <Form.Input placeholder='Prenom' value={prenom} onChange={(e) => setPrenom(e.target.value)} />     
            </Form.Group> 

            <Form.Group inline className='userformline'>
                <label>Date de naissance</label>
                <Form.Input type='date' placeholder='Date de naissance' value={naissance} onChange={(e) => setNaissance(e.target.value)} /> 
            </Form.Group> 

            <Form.Group inline className='userformline'>   
                <label>Ville de naissance</label>
                <Form.Select
                    fluid
                    options={villeoptions}
                    value={ville}
                    onChange={(e, data) => setVille(data.value)}
                    className="selectbox"
                />               
            </Form.Group>

            <Form.Group inline className='userformline'>   
                <label>Pays de naissance</label>
                <Form.Select
                    fluid
                    options={paysoptions}
                    value={pays}
                    onChange={(e, data) => setPays(data.value)}
                    className="selectbox"
                />                
            </Form.Group>

            <Form.Group inline className='userformline'>   
                <label>Nationalite</label>
                <Form.Select
                    fluid
                    options={paysoptions}
                    value={nationalite}
                    onChange={(e, data) => setNationalite(data.value)}
                    className="selectbox"
                />                
            </Form.Group>

            <Form.Group inline className='userformline'>
                <label>Numero de passport</label>
                <Form.Input placeholder='Numero de passport' value={numeroPassport} onChange={(e) => setNumeroPassport(e.target.value)} />            
            </Form.Group> 

            <Form.Group inline className='userformline'>   
                <label>Pays ayant delivre le passport</label>
                <Form.Select
                    fluid
                    options={paysoptions}
                    value={paysPassport}
                    onChange={(e, data) => setPaysPassport(data.value)}
                    className="selectbox"
                />              
            </Form.Group>
            
            <Form.Group inline className='userformline'>
                <label>Date de deliverance du passport</label>
                <Form.Input type='date' placeholder='Date de naissance' value={deliverancePassport} onChange={(e) => setDeliverancePassport(e.target.value)} />    
            </Form.Group> 

            <Form.Group inline className='userformline'>
                <label>Date d'expiration du passport</label>
                <Form.Input type='date' placeholder='Date de naissance' value={expirationPassport} onChange={(e) => setExpirationPassport(e.target.value)} />  
            </Form.Group> 
            
            <Form.Button onClick={handleConfirm} >Comfirm Changes</Form.Button>
            <Form.Button onClick={handleUpdate} >Update Data</Form.Button>
        </Form>
    </div>
  )
}

export default UpdateForm