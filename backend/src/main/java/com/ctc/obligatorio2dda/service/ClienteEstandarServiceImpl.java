package com.ctc.obligatorio2dda.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctc.obligatorio2dda.repository.ClienteEstandarRepository;

import com.ctc.obligatorio2dda.entity.ClienteEstandar;

@Service
public class ClienteEstandarServiceImpl implements ClienteEstandarService{
    @Autowired //accedo a la clase del repositorio
    private ClienteEstandarRepository clienteEstandarRepository;

    @Override
    @Transactional(readOnly = true)
    public Iterable<ClienteEstandar> findAll(){
        return clienteEstandarRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ClienteEstandar> findById(Long Id){
        return clienteEstandarRepository.findById(Id);
    }

    @Override
    @Transactional
    public ClienteEstandar save(ClienteEstandar save){
        return clienteEstandarRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(Long Id){
        clienteEstandarRepository.deleteById(Id);
    }
}
