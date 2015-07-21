package charles.system.repository;

import charles.entity.system.Premission;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by charles.chen on 2015/7/21.
 */
public interface PremissionRepository extends JpaRepository<Premission,Long> {
}
