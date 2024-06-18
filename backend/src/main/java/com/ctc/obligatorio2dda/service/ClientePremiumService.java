package com.ctc.obligatorio2dda.service;

import java.util.Optional;

import com.ctc.obligatorio2dda.entity.ClientePremium;

public interface ClientePremiumService{
    public Iterable<ClientePremium> findAll();
    public Optional<ClientePremium> findById(Long Id);
    public ClientePremium save(ClientePremium save);
    public void deleteById(Long Id);
}
