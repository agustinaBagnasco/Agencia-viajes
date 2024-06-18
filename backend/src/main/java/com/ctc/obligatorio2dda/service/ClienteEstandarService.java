package com.ctc.obligatorio2dda.service;

import java.util.Optional;

import com.ctc.obligatorio2dda.entity.ClienteEstandar;

public interface ClienteEstandarService {
    public Iterable<ClienteEstandar> findAll();
    public Optional<ClienteEstandar> findById(Long Id);
    public ClienteEstandar save(ClienteEstandar save);
    public void deleteById(Long Id);
}