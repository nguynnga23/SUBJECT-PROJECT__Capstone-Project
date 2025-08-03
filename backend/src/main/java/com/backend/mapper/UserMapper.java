package com.backend.mapper;

import com.backend.dto.UserDto;
import com.backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final DepartmentMapper departmentMapper;

    public UserDto toDto(User entity) {
        if (entity == null) {
            return null;
        }
        
        return new UserDto(
            entity.getId(),
            entity.getEmail(),
            entity.getUsername(),
            entity.getProvider(),
            entity.getConfirmed(),
            entity.getBlocked(),
            departmentMapper.toDto(entity.getDepartment()),
            entity.getCreatedAt(),
            entity.getUpdatedAt()
        );
    }

    public User toEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        
        User entity = new User();
        entity.setId(dto.getId());
        entity.setEmail(dto.getEmail());
        entity.setUsername(dto.getUsername());
        entity.setProvider(dto.getProvider());
        entity.setConfirmed(dto.getConfirmed());
        entity.setBlocked(dto.getBlocked());
        entity.setDepartment(departmentMapper.toEntity(dto.getDepartment()));
        entity.setCreatedAt(dto.getCreatedAt());
        entity.setUpdatedAt(dto.getUpdatedAt());
        
        return entity;
    }
}
