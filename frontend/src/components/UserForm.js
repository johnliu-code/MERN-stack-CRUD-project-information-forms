import React, { useEffect, useState } from 'react';
import { Form, Input } from 'semantic-ui-react';
import Individus from './Individus';
import UpdateForm from './UpdateForm';
import axios from 'axios';

const UserForm = () => {
    //Get form data from user by useState and the states of conditions
    const [questionNM, setQuestionNM] = useState(11);

    const [genre, setGenre] = useState('');
    const [part1Ok, setPart1Ok] = useState(false);

    const [nom, setNom] = useState('');
    const [part2Ok, setPart2Ok] = useState(false);

    const [prenom, setPrenom] = useState('');
    const [part3Ok, setPart3Ok] = useState(false);

    const [naissance, setNaissance] = useState('');
    const [part4Ok, setPart4Ok] = useState(false);

    const [ville, setVille] = useState('');
    const [part5Ok, setPart5Ok] = useState(false);

    const [pays, setPays] = useState('');
    const [part6Ok, setPart6Ok] = useState(false);

    const [nationalite, setNationalite] = useState('');
    const [part7Ok, setPart7Ok] = useState(false);

    const [numeroPassport, setNumeroPassport] = useState('');
    const [part8Ok, setPart8Ok] = useState(false);

    const [paysPassport, setPaysPassport] = useState('');
    const [part9Ok, setPart9Ok] = useState(false);

    const [deliverancePassport, setDeliverancePassport] = useState('');
    const [part10Ok, setPart10Ok] = useState(false);

    const [expirationPassport, setExpirationPassport] = useState('');
    const [part11Ok, setPart11Ok] = useState(false);

    const [id, setId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [findData, setFindData] = useState({});
    const [findOne, setFindOne] = useState(false);
    const [selectedData, setSelectedData] = useState('');
    const [itemSelected, setItemSelected] = useState(false);
    const [itemChanged, setItemChanged] = useState(false);

    //Save all of form data into array
    const [individusData, setIndividusData] = useState([]);
    const [tablevisible, setTablevisible] = useState(false);
    const [formsubmited, setFormsubmited] = useState(false);

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
        { key: 'france', text: 'France', value: 'France' },
        { key: 'china', text: 'China', value: 'China' },
    ]

     //CRUD with mongodb findone
     const findAllData = () =>{
        axios.get('http://localhost:5000/api/individus/')
        .then(response => {
            setIndividusData(response.data);
            console.log(individusData);
            setTablevisible(true);
        })
        .catch((error) => {
            console.log(error);
        });         
     }

    //CRUD with mongodb findone
    const findDataByName = (search) => {
        if(id != null){
            axios.get(`http://localhost:5000/api/individus/find/${search}`)
            .then(response => {
                setFindData(response.data);
                setFindOne(true);
                setItemChanged(true);
                setId('');
            })
            .catch((error) => {
                console.log(error);
            });            
        }
    }

    //CRUD with mongodb delete one
    const deleteDataById = (id) => {
        console.log(id);
        if(id != null){
            axios.delete(`http://localhost:5000/api/individus/${id}`)
            .then(response => {
                console.log(response.data);
                setItemChanged(true);
                setId('');
            })
            .catch((error) => {
                console.log(error);
            });            
        }
    }

    //CRUD with mongodb add one
    const addDataToDb = (data) => {
        if(individusData != null){
            axios.post('http://localhost:5000/api/individus', data)
            .then(response => {
                console.log("Data added to DBs...");
                setItemChanged(true);
            })
            .catch((error) => {
                console.log(error);
            });            
        }
    }

    //CRUD with mongodb update one
    const updateOne = (id, data) => {
        if(individusData != null){
            axios.put(`http://localhost:5000/api/individus/${id}`, data)
            .then(response => {
                console.log("Data updated to DBs...");
                setItemSelected(false);
                setItemChanged(true);
                setId('');
            })
            .catch((error) => {
                console.log(error);
            });            
        }
    }
    //Find data to update by id
    const handleUpdate = (id) => {
        let willUpdateData = individusData.filter(item => (item._id === id))[0];    //Return array and take index 0
        if(willUpdateData != null){
            setSelectedData(willUpdateData);
        }
        setItemSelected(true);          
    }

    //Submit function to set form data and display table
    const addIndividusData = () =>{
        //create instance of individus with form data(with state changes)
        const individus = {genre, nom, prenom, naissance, ville, pays, nationalite, numeroPassport, paysPassport, deliverancePassport, expirationPassport}
        //Add data to mongodb
        if(individus != null){
            addDataToDb(individus);
        }
        //change state to reload page
        setFormsubmited(true);
    } 
    
    useEffect(() => {
        //Initial table data when first loading...
        findAllData();
       
        resetForm();          //Reset form when every time user submited it
    }, [formsubmited, itemSelected, itemChanged])
    
    const resetForm = () => {
        //Reset form data states to default
        setGenre('');
        setPart1Ok(false);
        setNom('');
        setPart2Ok(false);
        setPrenom('');
        setPart3Ok(false);
        setNaissance('');
        setPart4Ok(false);
        setVille('');
        setPart5Ok(false);
        setPays('');
        setPart6Ok(false);
        setNationalite('');
        setPart7Ok(false);
        setNumeroPassport('');
        setPart8Ok(false);
        setPaysPassport('');
        setPart9Ok(false);
        setDeliverancePassport('');
        setPart10Ok(false);
        setExpirationPassport('');
        setPart11Ok(false);
        setFormsubmited(false);
        setQuestionNM(11);
    }

  return (
    <div className="formcontainer">
        <Form>
            <Form.Group inline className='userformline'>
                <label>Genre</label>
                <Form.Radio
                    label='Homme'
                    value='homme'
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
                {!part1Ok? 
                    <Form.Button onClick={() =>genre? (setPart1Ok(true), setQuestionNM(questionNM - 1)) : alert("Genre request!") }>Ajouter</Form.Button>
                : undefined}               
            </Form.Group>

            {part1Ok ? 
                <Form.Group inline className='userformline'>
                    <label>Nom de famille</label>
                    <Form.Input placeholder='Nom de famille' onChange={(e) => setNom(e.target.value)} />
                    {!part2Ok? 
                        <Form.Button onClick={() =>nom? (setPart2Ok(true), setQuestionNM(questionNM - 1)) : alert("Nom de famille request!") }>Ajouter</Form.Button>
                    : undefined}              
                </Form.Group> 
            : undefined}

            {part2Ok ? 
                <Form.Group inline className='userformline'>
                    <label>Prenom</label>
                    <Form.Input placeholder='Prenom' onChange={(e) => setPrenom(e.target.value)} />
                    {!part3Ok? 
                        <Form.Button onClick={() =>prenom? (setPart3Ok(true), setQuestionNM(questionNM - 1)) : alert("Prenom request!") }>Ajouter</Form.Button>
                    : undefined}      
                </Form.Group> 
            : undefined}

            {part3Ok ? 
                <Form.Group inline className='userformline'>
                    <label>Date de naissance</label>
                    <Form.Input type='date' placeholder='Date de naissance' onChange={(e) => setNaissance(e.target.value)} />
                    {!part4Ok? 
                        <Form.Button onClick={() =>naissance? (setPart4Ok(true), setQuestionNM(questionNM - 1)) : alert("Date de naissance request!") }>Ajouter</Form.Button>
                    : undefined}    
                </Form.Group> 
            : undefined}

            {part4Ok ? 
                <Form.Group inline className='userformline'>   
                    <label>Ville de naissance</label>
                    <Form.Select
                        fluid
                        options={villeoptions}
                        value={ville}
                        onChange={(e, data) => setVille(data.value)}
                        className="selectbox"
                    />
                    {!part5Ok? 
                        <Form.Button onClick={() =>ville? (setPart5Ok(true), setQuestionNM(questionNM - 1)) : alert("Ville request!") }>Ajouter</Form.Button>
                    : undefined}
                    
                </Form.Group>
            : undefined}

            {part5Ok ? 
                <Form.Group inline className='userformline'>   
                    <label>Pays de naissance</label>
                    <Form.Select
                        fluid
                        options={paysoptions}
                        value={pays}
                        onChange={(e, data) => setPays(data.value)}
                        className="selectbox"
                    />
                    {!part6Ok? 
                        <Form.Button onClick={() =>pays? (setPart6Ok(true), setQuestionNM(questionNM - 1)) : alert("Pays request!") }>Ajouter</Form.Button>
                    : undefined}
                    
                </Form.Group>
            : undefined}

            
            {part6Ok ? 
                <Form.Group inline className='userformline'>   
                    <label>Nationalite</label>
                    <Form.Select
                        fluid
                        options={paysoptions}
                        value={nationalite}
                        onChange={(e, data) => setNationalite(data.value)}
                        className="selectbox"
                    />
                    {!part7Ok? 
                        <Form.Button onClick={() =>nationalite? (setPart7Ok(true), setQuestionNM(questionNM - 1)) : alert("Nationalite request!") }>Ajouter</Form.Button>
                    : undefined}
                    
                </Form.Group>
            : undefined}

            {part7Ok ? 
                <Form.Group inline className='userformline'>
                    <label>Numero de passport</label>
                    <Form.Input placeholder='Numero de passport' onChange={(e) => setNumeroPassport(e.target.value)} />
                    {!part8Ok? 
                        <Form.Button onClick={() =>numeroPassport? (setPart8Ok(true), setQuestionNM(questionNM - 1)) : alert("Numero de passport request!") }>Ajouter</Form.Button>
                    : undefined}              
                </Form.Group> 
            : undefined}

            {part8Ok ? 
                <Form.Group inline className='userformline'>   
                    <label>Pays ayant delivre le passport</label>
                    <Form.Select
                        fluid
                        options={paysoptions}
                        value={paysPassport}
                        onChange={(e, data) => setPaysPassport(data.value)}
                        className="selectbox"
                    />
                    {!part9Ok? 
                        <Form.Button onClick={() =>paysPassport? (setPart9Ok(true), setQuestionNM(questionNM - 1)) : alert("Pays ayant delivre le passport request!") }>Ajouter</Form.Button>
                    : undefined}
                    
                </Form.Group>
            : undefined}
            
            {part9Ok ? 
                <Form.Group inline className='userformline'>
                    <label>Date de deliverance du passport</label>
                    <Form.Input type='date' placeholder='Date de naissance' onChange={(e) => setDeliverancePassport(e.target.value)} />
                    {!part10Ok? 
                        <Form.Button onClick={() =>deliverancePassport? (setPart10Ok(true), setQuestionNM(questionNM - 1)) : alert("Date de deliverance du passport request!") }>Ajouter</Form.Button>
                    : undefined}    
                </Form.Group> 
            : undefined}

            {part10Ok ? 
                <Form.Group inline className='userformline'>
                    <label>Date d'expiration du passport</label>
                    <Form.Input type='date' placeholder='Date de naissance' onChange={(e) => setExpirationPassport(e.target.value)} />
                    {!part11Ok? 
                        <Form.Button onClick={() =>expirationPassport? (setPart11Ok(true), setQuestionNM(questionNM - 1)) : alert("Date d'expiration du passport request!") }>Ajouter</Form.Button>
                    : undefined}    
                </Form.Group> 
            : undefined}
            
            {part11Ok ? 
                <Form.Button onClick={() => addIndividusData(individusData)}>Submit</Form.Button>
            : undefined}
        </Form>

        <h3>Il a {questionNM} question reste pour remplir formulaire...</h3>

        <div className='searchbox'>
            <h3> 
                {findOne ? 
                    <span>Find result: Nom = {findData.nom}, Prenom = { findData.prenom}, ID = {findData._id}</span>
                : undefined}
            </h3>
            <div>
                <Input  placeholder='Search by prenom...' onChange={(e) =>  setSearchName(e.target.value)} />
                <button icon='search' class="ui button" onClick={() => findDataByName(searchName)}>Search</button>
            </div>
           
        </div>
        
        {/*---------------Table--------------- */}
        { tablevisible ?
           <Individus data={individusData} onDelete={deleteDataById} onUpdate={handleUpdate} search={findData} />
        : undefined}

         {/*---------------Update form--------------- */}
         {itemSelected ? 
            <div className='updateform'>
                <UpdateForm data={selectedData} updateOneData={updateOne} itemSelected={selectedData ? true : false}/>
            </div>
        : undefined}
    </div>
  )
}

export default UserForm