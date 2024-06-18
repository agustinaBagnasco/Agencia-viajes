package com.ctc.obligatorio2dda.service;

import com.ctc.obligatorio2dda.repository.ClientePremiumRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ctc.obligatorio2dda.entity.ClientePremium;

@Service
public class ClientePremiumServiceImpl implements ClientePremiumService{
    
    @Autowired
    private ClientePremiumRepository clientePremiumRepository;

    @Override
    @Transactional(readOnly = true)
    public Iterable<ClientePremium> findAll(){
        return clientePremiumRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ClientePremium> findById(Long Id){
        return clientePremiumRepository.findById(Id);
    }

    @Override
    @Transactional
    public ClientePremium save(ClientePremium save){
        return clientePremiumRepository.save(save);
    }

    @Override
    @Transactional
    public void deleteById(Long Id){
        clientePremiumRepository.deleteById(Id);
    }
}
