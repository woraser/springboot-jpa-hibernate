package charles.system.repository;

import charles.entity.system.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by charles.chen on 2015/7/21.
 */
public interface RoleRepository extends JpaRepository<Role,Long> {
}
